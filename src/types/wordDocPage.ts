import { Paragraph } from 'docx';
export default interface WordDocPage {
  properties: Record<string, never>
  children: Paragraph[]
}
