import {useParams} from 'react-router-dom';
import {useCustomPage} from './use-custom-page';
import {FullPageLoader} from '../ui/progress/full-page-loader';
import {Navbar} from '../ui/navigation/navbar/navbar';
import {Helmet} from '../seo/helmet';
import {DefaultMetaTags} from '../seo/default-meta-tags';
import {Footer} from '../ui/footer/footer';
import {CustomPageBody} from '@common/custom-page/custom-page-body';

export function CustomPageLayout() {
  const {pageSlug} = useParams();
  const {data} = useCustomPage(pageSlug!);

  return (
    <div className="flex flex-col min-h-full bg">
      {data?.seo ? <Helmet tags={data.seo} /> : <DefaultMetaTags />}
      <Navbar
        menuPosition="custom-page-navbar"
        className="flex-shrink-0 sticky top-0"
      />
      <div className="flex-auto">
        {!data ? (
          <FullPageLoader className="mt-80" />
        ) : (
          <CustomPageBody page={data.page} />
        )}
      </div>
      <Footer className="mx-14 md:mx-40" />
    </div>
  );
}
