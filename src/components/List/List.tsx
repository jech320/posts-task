import { Spinner } from 'components';
import { Logger } from 'interfaces';
import { useMemo, useState } from 'react';
import { withLogger } from 'utils';
import './index.css';

interface ListProps<T> extends Logger {
  data: T[] | null;
  searchable?: boolean;
  loading?: boolean;
  onRowClick?: (data: T) => void | null;
  renderRow: (data: T) => JSX.Element;
}

const List = <T extends { id: number | string }>(props: ListProps<T>) => {
  const [searchText, setSearchText] = useState<string>('');

  console.log(props.logProps?.message);

  const filteredData = useMemo(() => {
    if (!props.data || !props.data.length) return [];

    if (!searchText || !props.searchable) return props.data;

    return props.data.filter((data, i) => {
      const regex = new RegExp(searchText, 'i');

      return JSON.stringify(data).search(regex) >= 0;
    });
  }, [searchText, props.data, props.searchable]);

  if (props.loading) return <Spinner message="Loading..." />;

  return (
    <>
      <div id="listContainer" className="d-flex flex-column align-items-center">
        {props.searchable && (
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Input"
              aria-label="Search Input"
              aria-describedby="basic-addon1"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        )}
        {filteredData &&
          !!filteredData.length &&
          filteredData.map((data) => (
            <div key={data.id && data.id} className="list-group mb-2">
              <button
                className={`list-group-item list-group-item-action ${
                  !props.onRowClick ? 'disabled' : ''
                }`}
                aria-current="true"
                onClick={() => props.onRowClick && props.onRowClick(data)}
                disabled={!props.onRowClick}
              >
                {props.renderRow(data)}
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default withLogger(List, 'List');
