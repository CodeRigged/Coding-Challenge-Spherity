import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type CredentialDocument = Credential & Document

@Schema({ timestamps: true })
export class Credential {
  @Prop({ required: true })
  type: string

  @Prop({ required: true })
  issuer: string

  @Prop({ required: true })
  subject: string

  @Prop({ required: true, type: Object })
  claims: Record<string, unknown>

  @Prop({ required: true })
  jwt: string
}

export const CredentialSchema = SchemaFactory.createForClass(Credential)
