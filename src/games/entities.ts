import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'
import { coordinates } from './initialCoordinates';

export type Symbol = 1 | 2

type Status = 'pending' | 'started' | 'finished'

type Coordinates =  {
  width: number,
  height: number,
  fps: number,
  ballY: number,
  ballX:number,
  ballRadius: number,
  ballSpeedY: number,
  ballSpeedX: number,
  paddle1Y: number,
  paddle2Y: number,
  paddleSpeed: number
}

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { default: 'pending' })
  status: Status

  @Column('json', { default: coordinates})
  coordinates: Coordinates

  @OneToMany(_ => Player, player => player.game, { eager: true })
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol'], { unique: true })
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @Column()
  userId: number

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column('char', { length: 1 })
  symbol: Symbol

  @Column('integer', { default: 0 })
  score: number
}
