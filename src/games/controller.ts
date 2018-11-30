import {
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, Get, Patch, NotFoundError, ForbiddenError, Body
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player, Updated } from './entities'

import { io } from '../index'
//import { coordinates } from './initialCoordinates';

@JsonController()
export default class GameController {

  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {
    const entity = await Game.create().save()

    await Player.create({
      game: entity,
      user,
      symbol: 1,
    }).save()

    const game = await Game.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })
    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)

    game.status = 'started'
    await game.save()

    const player = await Player.create({
      game,
      user,
      symbol: 2
    }).save()

    const gameState = await Game.findOneById(game.id)

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: gameState

    })
    return player
  }

  @Authorized()
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update: Partial<Updated>
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)
    const player = await Player.findOne({ user, game })
    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)

    const { type, position, newScore } = update

    if (type === "UPDATE_PADDLE_1") {
      await Game.updateById(game.id, { coordinates: { ...game.coordinates, paddle1Y: position }})
    } else if (type === "UPDATE_PADDLE_2") {
      await Game.updateById(game.id, { coordinates: { ...game.coordinates, paddle2Y: position }})
    } else if (type === "SCORE_PLAYER1") {
      if (newScore! < 8) {
        await Player.updateById(game.players[0].id, { score: newScore })
      }
    } else if (type === "SCORE_PLAYER2") {
      if (newScore! < 8) {
        await Player.updateById(game.players[1].id, { score: newScore })
      }
    }

    const updatedGame = await Game.findOneById(gameId)

    if (updatedGame!.players[0].score === 7) {
      updatedGame!.winner = 'Player 1 won'

    } else if (updatedGame!.players[1].score === 7) {
      updatedGame!.winner = 'Player 2 won'
    }

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: updatedGame

    })
    return updatedGame

  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Authorized()
  @Get('/games')
  getGames() {
    return Game.find()
  }
}

