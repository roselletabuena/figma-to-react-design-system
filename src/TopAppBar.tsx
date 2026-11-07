import React from 'react';

export interface TopAppBarProps {
  /** The headline / title shown in the app bar */
  title?: string;
  /** Optional supporting text under the headline */
  supportingText?: string;
  /** Optional callback for leading navigation icon click */
  onNavigationClick?: () => void;
  /** Optional callback for trailing avatar/action click */
  onAvatarClick?: () => void;
  /** Optional avatar image URL */
  avatarUrl?: string;
  /** Custom action slot to override or append to trailing elements */
  trailingAction?: React.ReactNode;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title = 'Label',
  supportingText,
  onNavigationClick,
  onAvatarClick,
  avatarUrl,
  trailingAction,
}) => {
  return (
    <header
      className="relative flex items-center justify-between w-full max-w-[412px] h-16 px-sds-100 py-sds-200 bg-surface text-text-default border-b border-border-default box-border select-none transition-colors"
      role="banner"
    >
      {/* Leading Navigation Icon */}
      <div className="flex items-center justify-center w-12 h-12 z-10">
        <button
          type="button"
          className="group flex items-center justify-center w-12 h-12 p-0 bg-transparent border-none rounded-sds-full cursor-pointer focus:outline-none text-text-default"
          onClick={onNavigationClick}
          aria-label="Navigation menu"
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-sds-full transition-colors group-hover:bg-surface-secondary group-focus-visible:bg-surface-tertiary group-active:bg-surface-tertiary">
            <svg
              className="w-6 h-6 block"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </button>
      </div>

      {/* Centered Title & Supporting Text */}
      <div className="absolute left-14 right-14 flex flex-col items-center justify-center text-center pointer-events-none">
        <h1 className="m-0 w-full text-[22px] leading-7 font-normal text-text-default truncate">
          {title}
        </h1>
        {supportingText && (
          <p className="m-0 w-full text-xs font-medium leading-4 tracking-[0.5px] text-text-secondary truncate">
            {supportingText}
          </p>
        )}
      </div>

      {/* Trailing Elements / Avatar */}
      <div className="flex items-center justify-center w-12 h-12 z-10">
        {trailingAction ? (
          trailingAction
        ) : (
          <button
            type="button"
            className="flex items-center justify-center w-12 h-12 p-0 bg-transparent border-none rounded-sds-full cursor-pointer focus:outline-none"
            onClick={onAvatarClick}
            aria-label="User avatar"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-8 h-8 rounded-sds-full object-cover block"
              />
            ) : (
              <div
                className="flex items-center justify-center w-8 h-8 rounded-sds-full bg-surface-secondary text-text-secondary transition-colors"
                aria-hidden="true"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </button>
        )}
      </div>
    </header>
  );
};
