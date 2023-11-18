/** @jsx h */
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
import { h } from 'preact';

import '@algolia/autocomplete-theme-classic';

const searchClient = algoliasearch(
  'ICXASKRC81',
  '8efa89e35424e0e81682430f25e6d4a7'
);

autocomplete({
  container: '#autocomplete',
  placeholder: 'samsung',
  debug: true,
  getSources({ query }) {
    return [
      {
        sourceId: 'items',
        getItems() {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: 'ziaci',
                query,
              },
            ],
          });
        },
        templates: {
          item({ item, components }) {
            return (
              <div className="aa-ItemWrapper">
                <div className="aa-ItemContent">
                  <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">
                      <components.Highlight hit={item} attribute="title" />
                    </div>
                    <div className="aa-ItemContentDescription">
                      <p>{item.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          },

          noResults() {
            return 'No matching items.';
          },
        },
      },
    ];
  },
});
