export function OverlayWebsiteBackground() {
  return (
    <div className="bg-card h-full overflow-hidden">
      <div className="navbar flex items-center bg-alt h-40 w-full">
        <div
          className="os-button w-20 h-20 rounded-full ml-14"
          style={{background: '#d7665d'}}
        />
        <div
          className="os-button w-20 h-20 rounded-full ml-14"
          style={{background: '#deab54'}}
        />
        <div
          className="os-button w-20 h-20 rounded-full ml-14"
          style={{background: '#6fb54c'}}
        />
      </div>

      <div className="page-body p-24">
        <div className="top-row flex items-center h-60 bg-alt p-10 mb-24">
          <div className="circle w-40 h-40 rounded-full mr-auto bg-disabled-bg"></div>
          <div className="line w-1/6 h-20 rounded bg-disabled-bg ml-14" />
          <div className="line w-1/6 h-20 rounded bg-disabled-bg ml-14" />
          <div className="line w-1/6 h-20 rounded bg-disabled-bg ml-14" />
        </div>

        <div className="middle-row flex items-center justify-center flex-col h-[260px] bg-alt my-24">
          <div className="line rounded h-36 mb-20 w-3/5 bg-disabled-bg" />
          <div className="line rounded h-14 mb-4 w-1/2 bg-disabled-bg/5" />
          <div className="line rounded h-14 mb-4 w-1/2 bg-disabled-bg/5" />
          <div className="line rounded h-14 mb-4 w-1/2 bg-disabled-bg/5" />
        </div>

        <div className="flex-container flex">
          <div className="left w-1/3">
            <div className="rect h-144 bg-disabled-bg/5 mb-6" />
            <div className="line fat-line h-36 mb-10 rounded bg-disabled-bg/5" />
            <div className="line mb-10 h-20 rounded bg-disabled-bg" />
            <div className="line mb-10 h-20 rounded bg-disabled-bg" />
            <div className="separator h-1 bg-divider my-24"></div>
            <div className="rect h-144 bg-disabled-bg/5 mb-10" />
            <div className="line mb-10 h-20 rounded bg-disabled-bg" />
            <div className="rect h-144 bg-disabled-bg/5 mb-6" />
          </div>

          <div className="right w-2/3 pl-24">
            <div className="rect h-288 mb-32 bg-disabled-bg/5" />
            <div className="line mb-10 h-20 rounded bg-disabled-bg" />
            <div className="line fat-line h-36 mb-10 rounded bg-disabled-bg/5" />
            <div className="line mb-10 h-20 rounded bg-disabled-bg" />
            <div className="separator h-1 bg-divider my-24" />
            <div className="line mb-10 h-20 rounded bg-disabled-bg" />
            <div className="rect h-288 mb-32 bg-disabled-bg/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
