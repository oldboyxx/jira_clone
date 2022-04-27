import { IsIn, IsOptional, IsString } from "class-validator";
import { ProjectCategory } from "../types";

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(Object.values(ProjectCategory))
  category?: ProjectCategory;
}