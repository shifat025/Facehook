import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import PostEntry from "./PostEntry";

export default function NewPost() {
  const [showPostEntry, setShowPostEntry] = useState(false);
  const { auth } = useAuth();
  return (
    <>
      {showPostEntry ? (
        <PostEntry onCreate={() => setShowPostEntry(false)} />
      ) : (
        <div className="card">
          <div className="flex-center mb-3 gap-2 lg:gap-4">
            <img
              className="max-w-24 max-h-24 lg:max-h-[96px] lg:max-w-[96px] rounded-full object-cover aspect-square"
              src={`${ import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`}
              alt="avatar"
            />

            <div className="flex-1">
              <textarea
                className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                name="post"
                id="post"
                placeholder="What's on your mind?"
                onClick={() => setShowPostEntry(true)}
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
