export type SmsNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type Reason = {
  number: SmsNumber | null;
  label: string;
};

export const smsReasons: Reason[] = [
  { number: 1, label: 'Μετάβαση σε φαρμακείο ή στον γιατρό' },
  { number: 2, label: 'Μετάβαση σε κατάστημα βασικών αγαθών' },
  { number: 3, label: 'Μετάβαση σε δημόσια υπηρεσία ή τράπεζα' },
  { number: 4, label: 'Κίνηση για παροχή βοήθειας σε τρίτους' },
  { number: 5, label: 'Μετάβαση διαζευγμένων γονέων ή σε κηδεία' },
  { number: 6, label: 'Σωματική άσκηση ή κίνηση με κατοικίδιο ζώο' }
];
