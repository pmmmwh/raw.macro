const pluginTester = require("babel-plugin-tester");
const plugin = require("babel-plugin-macros");

pluginTester({
  babelOptions: { filename: __filename },
  plugin,
  tests: {
    "no usage": {
      code: `import raw from '../macro'`,
      snapshot: true,
    },
    "correct usage": {
      code: `
        import raw from '../macro';

        const macro = raw('raw.macro');
        const md = raw('./fixtures/markdown.md');
        const js = raw('./fixtures/javascript.js');
      `,
      snapshot: true,
    },
    "static template literal": {
      code: `
        import raw from '../macro';

        const macro = raw('raw.macro');
        const md = raw(\`./fixtures/markdown.md\`);
        const js = raw(\`./fixtures/javascript.js\`);
      `,
      snapshot: true,
    },
    "static template literal using interpolation": {
      code: `
        import raw from '../macro';

        const fileName = 'markdown';
        const md = raw(\`./fixtures/\${fileName}.md\`);
      `,
      snapshot: true,
    },
    "dynamic import directory": {
      code: `
        import raw from '../macro';

        function dynamic(locale) {
          const md = raw(\`./fixtures/\${locale}/post.md\`);
          return md;
        }

        const data = dynamic('en')
      `,
      snapshot: true,
    },
    "dynamic import file name": {
      code: `
        import raw from '../macro';

        function dynamic(fileName) {
          const md = raw(\`./fixtures/\${fileName}.md\`);
          return md;
        }

        const data = dynamic('markdown')
      `,
      snapshot: true,
    },
    "dynamic import multiple variable": {
      code: `
        import raw from '../macro';

        const md = raw(\`./fixtures/\${locale}/\${fileName}.md\`);
      `,
      snapshot: true,
    },
    "multiple dynamic import": {
      code: `
        import raw from '../macro';

        const a0 = raw('./fixtures/markdown.md');
        const a1 = raw(\`./\${fixtureDir}/markdown.md\`);
        const a2 = raw(\`./fixtures/\${fileName}\`);
      `,
      snapshot: true,
    },
    "custom encoding": {
      code: `
        import raw from '../macro';

        const a0 = raw('./fixtures/markdown.md', 'utf-8');
        const a1 = raw(\`./\${fixtureDir}/markdown.md\`, 'binary');
        const a2 = raw(\`./fixtures/\${fileName}\`, 'binary');
      `,
      snapshot: true,
    },
    "invalid file in dynamic directory": {
      code: `
        import raw from '../macro';

        const a1 = raw(\`./\${fixtureDir}/index.js\`);
      `,
      throws: /Cannot resolve file (.+) in these directories/,
    },
    "invalid dynamic value at the start of template literal": {
      code: `
        import raw from '../macro';

        const a1 = raw(\`\${fixtureDir}/javascript.js\`);
      `,
      throws:
        "Invalid value, variable interpolation can't be at the start of template literal",
    },
    "invalid dynamic values exceed limit": {
      code: `
        import raw from '../macro';

        const a1 = raw(\`./\${anotherDir}/\${fixtureDir}/\${fileName}.md\`);
      `,
      throws:
        "Invalid value. You can only have 2 dynamic values max. 1 for directory name, 1 for file name.",
    },
  },
});
