import {useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {
  biolinkQueryKey,
  fetchBiolink,
  FetchBiolinkResponse,
} from '@app/dashboard/biolink/biolinks-datatable-page/requests/use-biolink';
import {
  biolinkEditorState,
  useBiolinkEditorStore,
} from '@app/dashboard/biolink/biolink-editor/biolink-editor-store';
import {queryClient} from '@common/http/query-client';
import {Biolink} from '@app/dashboard/biolink/biolink';

const params = {
  loadContent: true,
};

export function useEditorBiolink() {
  const biolinkId = useEditorBiolinkId();
  const biolink = useBiolinkEditorStore(s => s.biolink);
  const query = useQuery(
    biolinkQueryKey(biolinkId, params),
    () => fetchBiolink(biolinkId, params),
    {
      onSuccess: response => {
        biolinkEditorState().setBiolink(response.biolink);
      },
    }
  );

  return {isLoading: query.isLoading, biolink, status: query.status, biolinkId};
}

export function useEditorBiolinkId(): number {
  const {biolinkId} = useParams();
  return +biolinkId!;
}

export function setEditorBiolink(biolink: Biolink) {
  // "onSuccess" is not called for some reason when using "setQueryData"
  biolinkEditorState().setBiolink(biolink);
  queryClient.setQueryData<FetchBiolinkResponse>(
    biolinkQueryKey(biolink.id, params),
    {biolink}
  );
}
