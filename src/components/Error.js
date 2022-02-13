import React from "react";

const Error = ({ error }) => {
  return (
    <div className="ui message err-msg">
      <ul className="list">
        {Object.values(error).map((err) => {
          return <li key={err}> {err}</li>;
        })}
      </ul>
    </div>
  );
};

export default Error;
