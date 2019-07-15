workflow "Publish docs" {
  on = "push"
  resolves = ["Deploy"]
}

action "Clean Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "ci"
}

action "Build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Clean Install"]
  args = "run docs:build"
}

action "Deploy" {
  uses = "maxheld83/ghpages@v0.2.1"
  env = {
    BUILD_DIR = "packages/docs/src/.vuepress/dist/"
  }
  needs = ["Build"]
  secrets = ["GH_PAT"]
}
