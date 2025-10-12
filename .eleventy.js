module.exports = function(eleventyConfig) {
  // Pass through images and CSS
  eleventyConfig.addPassthroughCopy({ "src/static": "." });
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  // Create a collection for publications/awards
  eleventyConfig.addCollection("publications", function(collectionApi) {
    const items = collectionApi.getFilteredByGlob("src/content/publications/*.md");
    
    // Sort by order (if specified), then by date (newest first)
    return items.sort((a, b) => {
      // Check for manual order first
      const orderA = a.data.order !== undefined ? a.data.order : Infinity;
      const orderB = b.data.order !== undefined ? b.data.order : Infinity;
      
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      
      // If no order specified or same order, sort by date
      const dateA = a.data.year || a.data.date || 0;
      const dateB = b.data.year || b.data.date || 0;
      
      return dateB - dateA; // Newest first
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};