import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as amplify from "@aws-cdk/aws-amplify-alpha";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import * as codebuild from "aws-cdk-lib/aws-codebuild";

export class AmplifyCdkStack extends cdk.Stack {
  private config = {
    repositoryName: "demo-oracles",
    organizationName: "stabilityprotocol",
    productionBranch: "main",
  };

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const app = new amplify.App(this, "Oracles-App", {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: this.config.organizationName,
        repository: this.config.repositoryName,
        oauthToken: secretsmanager.Secret.fromSecretNameV2(
          this,
          "github-secret",
          "github/amplify-access-token"
        ).secretValue,
      }),
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: "1.0",
        appRoot: "app",
        frontend: {
          phases: {
            preBuild: {
              commands: ["yarn"],
            },
            build: {
              commands: ["yarn build"], //Command to build the proyect
            },
          },
          artifacts: {
            baseDirectory: "dist", // Directory where build artifacts are saved
            files: ["**/*"],
          },
        },
      }),
    });

    app.addBranch("branch", {
      branchName: this.config.productionBranch,
      stage: "PRODUCTION",
    });
  }
}
