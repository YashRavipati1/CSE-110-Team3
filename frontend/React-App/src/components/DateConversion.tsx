/*export const convertToPST = (inputDate: string): string => {
    const date = new Date(inputDate);
    // Use Intl.DateTimeFormat to adjust for PST and account for DST
    const options: Intl.DateTimeFormatOptions = { timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit" };
    const pstDate = new Intl.DateTimeFormat("en-US", options).format(date);

    // Format as YYYY-MM-DD
    const [month, day, year] = pstDate.split("/");
    return `${year}-${month}-${day}`;
};

export const formatToPST = (date: string) => {
    const pstDate = convertToPST(date);
    return pstDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};*/

export {};