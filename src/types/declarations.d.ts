declare module 'react-native-calendar-picker';
declare module 'react-native-vector-icons/AntDesign';
declare module 'react-native-vector-icons/Feather';
declare module '@react-native-firebase/messaging';

declare module '*.png' {
  const content: number;
  export default content;
}

declare module '*.jpg' {
  const content: number;
  export default content;
}

declare module '*.jpeg' {
  const content: number;
  export default content;
}

declare module '*.webp' {
  const content: number;
  export default content;
}

declare module '*.svg' {
  import type {FC} from 'react';

  import type {SvgProps} from 'react-native-svg';

  const content: FC<SvgProps>;
  export default content;
}
