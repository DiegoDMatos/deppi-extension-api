import { CourseCoverService } from "../services/CourseCoverService";
import { showCoverRequest, uploadCoverRequest } from "../model/CourseCoverRequest";
import { Request, Response } from "express";

export class CourseCoverController {
  async upload(req: Request, res: Response) {

    const coverService = new CourseCoverService();

    const coverImage: uploadCoverRequest = {
      courseId: String(req.params.id),
      file: req.file
    }

    const result = await coverService.upload(coverImage);

    return res.status(201).json(result);
  }

  async show(req: Request, res: Response) {
    const service = new CourseCoverService();

    const coverImage: showCoverRequest = {
      courseId: String(req.params.taskId),
    }

    const filePath = await service.show(coverImage);

    return res.sendFile(filePath);
  }
}