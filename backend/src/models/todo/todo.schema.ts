import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class Todo extends Document {
  @Prop({ required: true, type: String })
  text: string

  @Prop({ default: false, type: Boolean })
  completed: boolean
}

export const TodoSchema = SchemaFactory.createForClass(Todo)
