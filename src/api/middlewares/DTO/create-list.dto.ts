import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class ListCreateAPI {
  @IsString()
  @IsNotEmpty()
  description: string;
}
