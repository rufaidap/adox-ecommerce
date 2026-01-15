/**
 * @file textFormatter.ts
 * @description Utility functions for formatting text, especially for filter labels
 */

/**
 * Formats text by capitalizing words and replacing hyphens with spaces
 * @param text - The text to format
 * @returns Formatted text with proper capitalization and spacing
 *
 * @example
 * formatFilterText('on-rent') // returns 'On Rent'
 * formatFilterText('pending-approval') // returns 'Pending Approval'
 * formatFilterText('available') // returns 'Available'
 */
export const formatFilterText = (text: string): string => {
  if (!text) return '';

  return text
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Creates filter options with "All" option and properly formatted labels
 * @param items - Array of items to create filter options from
 * @param getValue - Function to extract value from item
 * @param getLabel - Function to extract label from item (optional, defaults to getValue)
 * @returns Array of filter options with "All" option at the beginning
 */
export const createFilterOptions = <T>(
  items: T[],
  getValue: (item: T) => string,
  getLabel?: (item: T) => string
) => {
  const uniqueItems = [...new Set(items.map(getValue))];

  const options = uniqueItems.map((item, index) => ({
    id: index + 1, // Start from 1 since 0 is reserved for "All"
    name: item,
    value: item,
    label: formatFilterText(
      getLabel ? getLabel({[getValue.name]: item} as T) : item
    ),
  }));

  // Add "All" option at the beginning
  return [
    {
      id: 0,
      name: 'all',
      value: null, // null value means "show all"
      label: 'All',
    },
    ...options,
  ];
};
