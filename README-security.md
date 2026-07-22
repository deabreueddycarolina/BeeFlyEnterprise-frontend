Security checks added for the frontend repo:

- `detect-secrets` baseline file: `.secrets.baseline`
- `pre-commit` configuration: `.pre-commit-config.yaml`

To enable locally:

1. Install `pre-commit` and `detect-secrets`:

   ```bash
   pip install detect-secrets pre-commit
   ```

2. Install the git hook:

   ```bash
   pre-commit install
   ```

3. (Optional) Generate a fresh baseline and review it:

   ```bash
   detect-secrets scan > .secrets.baseline
   git add .secrets.baseline
   git commit -m "Update secrets baseline"
   ```

Notes:
- Review `.secrets.baseline` for false positives before committing.
- If you find secrets already in git history, rotate them immediately and remove them with `git filter-repo` or `BFG Repo-Cleaner`.

Docker usage:

1. Build the container from the frontend folder:

   ```powershell
   docker build -t beefly-frontend .
   ```

2. Run the container:

   ```powershell
   docker run --rm -p 5500:5500 beefly-frontend
   ```

3. Open your browser at `http://localhost:5500`.
