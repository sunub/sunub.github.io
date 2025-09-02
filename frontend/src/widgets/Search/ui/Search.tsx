'use client';

import { Provider } from 'jotai';
import { createPortal } from 'react-dom';
import { SearchButton } from './SearchButton';
import { SearchModal } from './SearchModal';
import { useSearchModal } from '../hook/useSearchAtoms';

function Search() {
  const { isOpen, open, close } = useSearchModal();
  return (
    <>
      <SearchButton isOpen={isOpen} toggleOpen={open} />
      {isOpen &&
        createPortal(
          <Provider>
            <SearchModal close={close} />
          </Provider>,
          document.getElementById('blog-search__input-area')!
        )}
    </>
  );
}
export { Search };
