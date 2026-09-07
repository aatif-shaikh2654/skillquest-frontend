import type {
  BecomeInstructorRequest,
  BecomeInstructorResponse,
} from "@repo/types";
import { api } from "@/lib/axios";

export function becomeInstructor(body: BecomeInstructorRequest) {
  return api
    .post<BecomeInstructorResponse>("/instructor/become", body)
    .then((response) => response.data);
}
