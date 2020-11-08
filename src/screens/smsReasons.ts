import { smsNumberType } from './SmsScreen';

export type ReasonType = {
  number: smsNumberType;
  label: string;
};

export const smsReasons: ReasonType[] = [
  { number: 1, label: 'Μετάβαση σε φαρμακείο ή στον γιατρό' },
  { number: 2, label: 'Μετάβαση σε κατάστημα βασικών αγαθών' },
  { number: 3, label: 'Μετάβαση σε δημόσια υπηρεσία ή τράπεζα' },
  { number: 4, label: 'Κίνηση για παροχή βοήθειας σε τρίτους' },
  { number: 5, label: 'Μετάβαση διαζευγμένων γονέων ή σε κηδεία' },
  { number: 6, label: 'Σωματική άσκηση ή κίνηση με κατοικίδιο ζώο' }
];
