import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsString, IsInt, IsDate, IsBoolean } from 'class-validator';

@InputType()
export class NewTaskInput {
  //タイトル
  @Field()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @Field()
  user_id: string;

  //概要
  @Field()
  @IsString()
  @MaxLength(1024)
  overview: string;

  //技術力
  @Field()
  @IsInt()
  technology: number;

  //達成力
  @Field()
  @IsInt()
  achievement: number;

  //問題発見・解決力
  @Field()
  @IsInt()
  solution: number;

  //意欲
  @Field()
  @IsInt()
  motivation: number;

  //設計力
  @Field()
  @IsInt()
  plan: number;

  //デザイン力
  @Field()
  @IsInt()
  design: number;

  //縦並び順
  @Field()
  @IsInt()
  vertical_sort: number;

  //期日
  @Field()
  @IsString()
  end_date: string;

  @Field()
  @IsString()
  project_id: string;

  @Field()
  @IsString()
  list_id: string;

  @Field()
  @IsBoolean()
  completed_flg: boolean;
}
