export interface ChecklistItem {
    title: string;
    subText: string;
}
export interface Checklist {
    title: string;
    description: string;
    tags: string[];
    items: ChecklistItem[];
}