import { format } from 'date-fns';

export default function DateComponent({
  dateString,
}: Readonly<{
  dateString: string | undefined;
}>) {
  if (!dateString) {
    return null;
  }

  return (
    <time className="" dateTime={dateString}>
      {format(new Date(dateString), 'LLLL d, yyyy')}
    </time>
  );
}
