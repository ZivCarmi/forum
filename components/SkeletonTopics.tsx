const SkeletonTopics = () => {
  const randomHeaderWidths = [
    "w-[125px]",
    "w-[175px]",
    "w-[225px]",
    "w-[300px]",
    "w-[390px]",
    "w-[450px]",
  ];

  const randomUserWidth = ["w-[50px]", "w-[90px]", "w-[140px]"];

  const randomTimeWidths = ["w-[80px]", "w-[115px]", "w-[160px]"];

  return (
    <ul className="flat">
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <li
            key={i}
            className="p-4 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-[minmax(auto,_1fr)_70px_minmax(auto,_300px)] gap-6"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array(Math.floor(Math.random() * 3))
                  .fill(null)
                  .map((_, i) => (
                    <i
                      key={i}
                      className="animate-pulse bg-neutral-700 w-5 h-5 rounded-full"
                    />
                  ))}
              </div>
              <h3
                className={`animate-pulse bg-neutral-400 title ${
                  randomHeaderWidths[
                    Math.floor(Math.random() * randomHeaderWidths.length)
                  ]
                } h-3 rounded-md`}
              />
            </div>
            <div className="flex items-center">
              <span className="animate-pulse bg-neutral-400 w-[100px] h-3 rounded-md" />
            </div>
            <div>
              <div
                className={`animate-pulse bg-neutral-400 ${
                  randomUserWidth[
                    Math.floor(Math.random() * randomUserWidth.length)
                  ]
                } h-3 rounded-md mb-2`}
              />
              <div
                className={`animate-pulse bg-neutral-400 ${
                  randomTimeWidths[
                    Math.floor(Math.random() * randomTimeWidths.length)
                  ]
                } h-3 rounded-md`}
              />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default SkeletonTopics;
