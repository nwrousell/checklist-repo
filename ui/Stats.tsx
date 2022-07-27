import Text from "./Text";

interface Stat {
    title: string;
    number: number;
}
export function Stats({ stats }: { stats: Stat[]; }) {
    return (
        <div className="flex flex-col flex-wrap md:flex-row">
            {stats.map(({ title, number }, i) => {
                return (
                    <div key={i} className="p-4 mb-4 rounded bg-gray-50 md:mb-0 md:mr-4 dark:bg-gray-700">
                        <Text>{title}</Text>
                        <p className="text-3xl font-semibold text-gray-900 dark:text-gray-50">{number}</p>
                    </div>
                );
            })}
        </div>
    );
}
