import clsx, {ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

const classMerge = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export default classMerge;
