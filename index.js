module.exports = {
  hooks: {
    "page:before": function(page) {
      let config = this.options.pluginsConfig["nonocast-style"] ? this.options.pluginsConfig["nonocast-style"] : {};
      
      console.log(config);

      let gitalk = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
<script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>
<div id="gitalk-container"></div>
<script>
  var gitalk = new Gitalk({
    clientID: '${config.clientID}',
    clientSecret: '${config.clientSecret}',
    repo: '${config.repo}',
    owner: '${config.owner}',
    admin: ['${config.owner}'],
    id: location.pathname,      // Ensure uniqueness and length less than 50
    distractionFreeMode: false  // Facebook-like distraction free mode
  })
  gitalk.render('gitalk-container')
</script>`;

      page.content = `${page.content}\n\n${gitalk}`;
      return page;
    }
  }
};
