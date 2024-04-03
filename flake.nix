{
    description = "Calendar for stardom events";

    inputs = {
        nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
        flake-utils.url = "github:numtide/flake-utils";
    };

    outputs = {self, nixpkgs, flake-utils, ...}:
    flake-utils.lib.eachSystem [
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
        "x86_64-linux"
        "x86_64-windows"
        "i686-windows"
    ] (system:
    {
        devShells.default = let
            pkgs = import nixpkgs {
                inherit system;
            };
        in
        pkgs.mkShell.override {
            packages = with pkgs; [
                nodejs
                eslint_d
            ];
        };
    });
}
