import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @MaxLength(50000)
  body: string;

  @IsNumber()
  issueId: number;

  @IsNumber()
  userId: number;
}
