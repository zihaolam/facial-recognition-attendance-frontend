export const titleCase = (s: string): string =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase())

export const getKeyData = (str: string | undefined): string => {
    if (!str) return "";
    const constituents = str.split("::")
    if (constituents.length > 1) {
        const key = constituents[1]
        return titleCase(key)
    }
    return titleCase(constituents[0])
}