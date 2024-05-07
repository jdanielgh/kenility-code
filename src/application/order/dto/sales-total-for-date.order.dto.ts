import { IsNumber, IsString } from 'class-validator';

export class SalesTotalForDateDto {
  constructor(total: number, startDate: string, endDate: string) {
    this.total = total;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  @IsNumber()
  total: number;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;
}
