import { redirect } from 'next/navigation';
import { NewsTilelist } from './components/news-tile-list';
import { sections } from './utils/sections';

export default async function Home() {
  redirect('/sections');
  return null;
}
