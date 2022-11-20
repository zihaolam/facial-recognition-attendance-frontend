export interface FaceImageEntry {
  faceImage: string;
  fullName: string;
}

export interface UserSchema {
  pk: string;
  faceImagePath: string;
  createdAt: string;
}

export interface CreateUserFormValues {
  faceImages: FaceImageEntry[];
}

export const defaultCreateUserFormValues: CreateUserFormValues = {
  faceImages: []
};