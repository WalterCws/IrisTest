export interface TaskDTO {
    id: number;
    description: string;
    isCompleted: boolean;
    isFavourite: boolean;
    deadlineAt: Date | null;
}