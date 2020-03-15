import {
	Entity,
	Index,
	Column,
	RelationId,
	ManyToOne,
	JoinColumn
} from 'typeorm';
import { Base } from '../core/entities/base';
import { TimeSlot as ITimeSlot } from '@gauzy/models';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
import { Task } from '../tasks';
import { TimeLog } from './time-log.entity';

@Entity('time_slot')
export class TimeSlot extends Base implements ITimeSlot {
	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	@Index()
	@Column()
	name: string;

	@ApiProperty({ type: TimeLog })
	@ManyToOne(() => TimeLog, { nullable: true })
	@JoinColumn()
	timeLog?: TimeLog;

	@ApiProperty({ type: String, readOnly: true })
	@RelationId((timeSlot: TimeSlot) => timeSlot.timeLog)
	readonly timeLogId?: string;

	@ApiProperty({ type: Task })
	@ManyToOne(() => Task, { nullable: true })
	@JoinColumn()
	task?: Task;

	@ApiProperty({ type: String, readOnly: true })
	@RelationId((timeSlot: TimeSlot) => timeSlot.task)
	readonly taskId?: string;

	@ApiProperty({ type: Number })
	@IsNumber()
	@Column({ default: 0 })
	duration: number;

	@ApiProperty({ type: Number })
	@IsNumber()
	@Column({ default: 0 })
	keyboard: number;

	@ApiProperty({ type: Number })
	@IsNumber()
	@Column({ default: 0 })
	mouse: number;

	@ApiProperty({ type: Number })
	@IsNumber()
	@Column({ default: 0 })
	overall?: number;

	@ApiProperty({ type: Date })
	@IsDateString()
	@Column({ nullable: true, default: null })
	startedAt?: Date;

	@ApiProperty({ type: Date })
	@IsDateString()
	@Column({ nullable: true, default: null })
	stoppedAt?: Date;
}
