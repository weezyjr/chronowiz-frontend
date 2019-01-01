import { Brand } from '../Types/brand';
import { Collection } from '../Types/collection';
import { Watch } from '../Types/watch';

export class SearchResults {
  brands?: Brand[];
  collections?: Collection[];
  watches?: Watch[];
}
