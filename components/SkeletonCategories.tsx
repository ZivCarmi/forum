const SkeletonCategories = () => {
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

  return Array(2)
    .fill(null)
    .map((_, i) => (
      <div className="flat">
        <div className="flex items-center justify-between px-4 py-[1.125rem]">
          <h2
            className={`animate-pulse bg-neutral-400 title ${
              randomHeaderWidths[
                Math.floor(Math.random() * randomHeaderWidths.length)
              ]
            } h-3 rounded-md`}
          />
        </div>
        <ul>
          {Array(Math.floor(Math.random() * (5 - 3)) + 3)
            .fill(null)
            .map((_, i) => (
              <li
                key={i}
                className="p-4 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-[auto_minmax(auto,_1fr)_minmax(auto,_100px)_minmax(auto,_300px)] gap-6"
              >
                <div className="py-2">
                  <div className="animate-pulse bg-neutral-700 w-10 h-10 rounded-full" />
                </div>
                <h3
                  className={`animate-pulse bg-neutral-400 title ${
                    randomHeaderWidths[
                      Math.floor(Math.random() * randomHeaderWidths.length)
                    ]
                  } h-3 rounded-md mt-2`}
                />
                <div className="self-center text-sm">
                  <div className="animate-pulse bg-neutral-400 w-[100px] h-3 rounded-md" />
                </div>
                <div className="mt-2">
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
      </div>
    ));
};

export default SkeletonCategories;
