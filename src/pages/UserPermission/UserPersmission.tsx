import { useEffect, useRef, useState } from 'react';
import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import { useFetch } from '../../hooks/useFetch';
import { UserServiceInstance } from '../../service/user.service';
import SpinnerLoader from '@/common/SpinnerLoader';

enum selectOptions {
  active = 'active',
  inactive = 'inactive',
}
enum sortingOptions {
  asc = 'asc',
  desc = 'desc',
}

const UserPersmission = () => {
  const { fn, data, loading } = useFetch(UserServiceInstance.getUsers);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [text, setText] = useState('');
  const [selectActiveOption, setSelectActiveOption] = useState<selectOptions | string>('');
  const [sort, setSort] = useState<sortingOptions | string>('');
  const isMounted = useRef(false);

  async function handleFilterSubmit() {
    console.log('Filter submitted with:', { limit, page, text, selectActiveOption, sort });
    fn(limit, page, text, selectActiveOption, sort);
  }

  async function handleFilterReset() {
    if (sort || selectActiveOption) {
      setSort('');
      setSelectActiveOption('');
    }
    fn(limit, page, text);
  }

  useEffect(() => {
    fn(limit, page, text).finally(() => {
      isMounted.current = true;
    });
  }, [page, limit]);

  useEffect(() => {
    fn(limit,page,text)
  },[text])

  if (!isMounted.current && loading) return <SpinnerLoader />;

  return (
    <BasicTableOne
      handleFilterSubmit={handleFilterSubmit}
      selectActiveOption={selectActiveOption}
      handleFilterReset={handleFilterReset}
      setSelectActiveOption={setSelectActiveOption}
      sort={sort}
      setSort={setSort}
      setLimit={setLimit}
      limit={limit}
      setPage={setPage}
      page={page}
      data={data}
      setText={setText}
    />
  );
};

export default UserPersmission;
