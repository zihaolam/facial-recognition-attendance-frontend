export interface FaceImageEntry {
  faceImage: string;
  fullName: string;
}

export interface UserSchema {
  pk: string;
  faceImagePath: string;
  createdAt: string;
  attendances: {
    arrivalTime: string | null;
    date: string;
    pk: string;
    sk: string;
  }[]
}

export interface CreateUserFormValues {
  faceImages: FaceImageEntry[];
}

export const defaultCreateUserFormValues: CreateUserFormValues = {
  faceImages: []
};