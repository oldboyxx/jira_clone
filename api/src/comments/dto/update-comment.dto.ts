import { IsString, MaxLength } from "class-validator";

export class UpdateCommentDto {
  @IsString()
  @MaxLength(50000)
  body: string;
}
