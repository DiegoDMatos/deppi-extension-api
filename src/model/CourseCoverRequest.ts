import Multer from "multer";

export interface showCoverRequest {
  courseId: string;
  userId: number;
}

export interface uploadCoverRequest{
  courseId: string;
  userId: string;
  file?: Express.Multer.File;
}