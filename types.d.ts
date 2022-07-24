export interface ChecklistItem {
    title: string;
    subText?: string;
    [key: string]: any;
}
export interface Checklist {
    title: string;
    description: string;
    tags: string[];
    items: ChecklistItem[];
    hearts: Number
}