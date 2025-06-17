import "./urls.css";
const baseUrl = process.env.REACT_APP_API_URL;

export default function urls({urls}){
    return (
    <div>
      <h2>Existing URLs:</h2>
      {urls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        urls.map((url) => (
          <div key={url.shortId} className="url-card">
           <p><strong>Short url:</strong>{" "}<a href={`${baseUrl}/url/${url.shortId}`}target="_blank"rel="noopener noreferrer">{`${baseUrl}/url/${url.shortId}`}</a>
</p>
            <p>
              <strong>Original URL:</strong>{" "}
              <a href={url.redirectUrl} target="_blank" rel="noopener noreferrer">
                {url.redirectUrl}
              </a>
            </p>
            <p><strong>Expires at:</strong> {new Date(url.expires).toLocaleDateString('en-GB')}</p>
            <p><strong>Visitors:</strong>{url.visitHistory.length}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );

}
