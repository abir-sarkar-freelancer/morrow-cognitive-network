(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const state = {
    balance: 128,
    earned: 640,
    spent: 512,
    plugged: true,
    leaseSettled: false,
    activeMode: 'enterprise',
    connections: { enterprise: false, local: false },
  };

  const configs = {
    enterprise: {
      kind: 'REMOTE',
      title: 'Connect an enterprise host.',
      description: 'Register MORROW as a remote MCP server in an enterprise agent host. Your organisation can request permitted Faculties and publish eligible workloads to the Exchange.',
      filename: 'mcp.remote.json',
      button: 'Connect enterprise host',
      config: `{
  "mcpServers": {
    "morrow-brain": {
      "url": "https://mcp.morrow.example/brain",
      "headers": {
        "Authorization": "Bearer \${MORROW_TOKEN}"
      }
    }
  }
}`,
    },
    local: {
      kind: 'LOCAL / STDIO',
      title: 'Connect a local bridge.',
      description: 'Run the fictional MORROW bridge beside your tools. The local process exposes only the Faculty tools you enable and uses the connected Lattice as its capability source.',
      filename: 'mcp.local.json',
      button: 'Connect local bridge',
      config: `{
  "mcpServers": {
    "morrow-brain-local": {
      "command": "morrow-bridge",
      "args": ["connect", "--port", "/dev/morrow0"]
    }
  }
}`,
    },
  };

  let toastTimer;
  function toast(message) {
    const node = $('#toast');
    if (!node) return;
    node.textContent = message;
    node.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => node.classList.remove('is-visible'), 2900);
  }

  function render() {
    const balance = $('#pulse-balance');
    const earned = $('#earned-total');
    const spent = $('#spent-total');
    if (balance) balance.textContent = String(state.balance);
    if (earned) earned.textContent = `+ ${state.earned}`;
    if (spent) spent.textContent = `− ${state.spent}`;

    const toggle = $('#plug-toggle');
    if (toggle) {
      toggle.classList.toggle('is-on', state.plugged);
      toggle.setAttribute('aria-checked', String(state.plugged));
    }
    const plugStatus = $('#plug-status');
    const plugDescription = $('#plug-description');
    const portStateCopy = $('#port-state-copy');
    const catalogueStatus = $('#catalogue-status');
    if (plugStatus) plugStatus.textContent = state.plugged ? 'CONNECTED' : 'REMOVED';
    if (plugDescription) plugDescription.textContent = state.plugged ? 'Faculties provisioned · Brain MCP available' : 'Faculties dormant · Brain MCP paused';
    if (portStateCopy) portStateCopy.textContent = state.plugged ? 'CONNECTED' : 'MODULE REMOVED';
    if (catalogueStatus) catalogueStatus.textContent = state.plugged ? 'LATTICE CONNECTED · FACULTIES ACTIVE' : 'LATTICE REMOVED · FACULTIES DORMANT';

    $$('[data-invoke]').forEach((button) => {
      button.disabled = !state.plugged;
      button.setAttribute('aria-disabled', String(!state.plugged));
      const facultyId = button.dataset.invoke;
      const facultyState = $(`[data-faculty-state="${facultyId}"]`);
      if (facultyState) facultyState.textContent = state.plugged ? 'PROVISIONED' : 'DORMANT · PORT REMOVED';
      const card = button.closest('.faculty-card');
      if (card) card.classList.toggle('is-dormant', !state.plugged);
    });

    const connectionState = $('#connection-state');
    const connectionButton = $('[data-connect]');
    const currentConnection = state.connections[state.activeMode];
    if (connectionState) {
      connectionState.classList.toggle('is-connected', currentConnection && state.plugged);
      const label = !state.plugged ? 'PORT REQUIRED' : (currentConnection ? 'CONNECTED · SIMULATED' : 'NOT CONNECTED');
      connectionState.innerHTML = `<i></i> ${label}`;
    }
    if (connectionButton) {
      connectionButton.disabled = !state.plugged;
      connectionButton.textContent = !state.plugged
        ? 'Connect Lattice to continue'
        : (currentConnection ? `Disconnect ${state.activeMode === 'local' ? 'local bridge' : 'enterprise host'}` : configs[state.activeMode].button);
    }
    const leasePill = $('#lease-pill');
    if (leasePill) {
      leasePill.textContent = state.leaseSettled ? 'LEASE SETTLED' : 'LEASE PAUSED';
      leasePill.classList.toggle('is-live', state.leaseSettled);
    }
  }

  function renderMode(mode) {
    state.activeMode = mode;
    const config = configs[mode];
    $$('[data-mcp-tab]').forEach((tab) => {
      const active = tab.dataset.mcpTab === mode;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    $('#connection-kind').textContent = config.kind;
    $('#connection-title').textContent = config.title;
    $('#connection-description').textContent = config.description;
    $('#config-filename').textContent = config.filename;
    const code = $('#enterprise-config');
    if (code) code.textContent = config.config;
    const connectButton = $('[data-connect]');
    if (connectButton) connectButton.dataset.connect = mode;
    render();
  }

  $$('[data-invoke]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!state.plugged) return toast('The Lattice is removed. Faculties are dormant.');
      const cost = Number(button.dataset.cost || 0);
      const name = button.dataset.name || 'Faculty';
      if (state.balance < cost) return toast(`Not enough PULSE for ${name}. Offer edge capacity to earn more.`);
      state.balance -= cost;
      state.spent += cost;
      render();
      toast(`${name} invoked. ${cost} PULSE burned. The work leaves a trace in your ledger.`);
    });
  });

  $('#plug-toggle')?.addEventListener('click', () => {
    state.plugged = !state.plugged;
    render();
    toast(state.plugged ? 'Lattice connected. Provisioned Faculties are active again.' : 'Lattice removed. Faculties and Brain MCP are now dormant.');
  });

  $$('[data-mcp-tab]').forEach((tab) => tab.addEventListener('click', () => renderMode(tab.dataset.mcpTab)));

  $$('[data-connect]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!state.plugged) return toast('Connect the Lattice before opening Brain MCP.');
      const mode = button.dataset.connect;
      state.connections[mode] = !state.connections[mode];
      render();
      toast(state.connections[mode]
        ? `${mode === 'local' ? 'Local bridge' : 'Enterprise host'} connected in this simulation. No server was contacted.`
        : `${mode === 'local' ? 'Local bridge' : 'Enterprise host'} disconnected in this simulation.`);
    });
  });

  const range = $('#capacity-range');
  function updateEstimate() {
    if (!range) return;
    const percentage = Number(range.value);
    const estimate = Math.round(percentage * 2.4);
    $('#capacity-value').textContent = String(percentage);
    $('#earn-estimate').textContent = String(estimate);
    const progress = ((percentage - 5) / 35) * 100;
    range.style.background = `linear-gradient(to right, var(--acid) 0%, var(--acid) ${progress}%, rgba(238,236,229,.25) ${progress}%, rgba(238,236,229,.25) 100%)`;
  }
  range?.addEventListener('input', updateEstimate);
  updateEstimate();

  $('#earn-button')?.addEventListener('click', () => {
    if (!state.plugged) return toast('The Lattice must be connected to offer edge capacity.');
    const percentage = Number(range?.value || 20);
    const reward = Math.round(percentage * 2.4);
    state.balance += reward;
    state.earned += reward;
    state.leaseSettled = true;
    render();
    $('#earn-note').textContent = `Settlement complete: +${reward} PULSE for a simulated 20-minute contribution at ${percentage}% capacity. This did not use your device.`;
    toast(`Edge lease settled. +${reward} PULSE added to your balance.`);
  });

  $$('[data-copy-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const code = document.getElementById(button.dataset.copyTarget);
      if (!code) return;
      const text = code.textContent;
      try {
        await navigator.clipboard.writeText(text);
        toast('Configuration copied. Replace the example endpoint and credentials before use.');
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand('copy');
        textarea.remove();
        toast(copied ? 'Configuration copied.' : 'Clipboard access unavailable in this browser.');
      }
    });
  });

  const menuToggle = $('#menu-toggle');
  const nav = $('#primary-nav');
  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav?.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  });
  $$('#primary-nav a').forEach((link) => link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
    nav?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }));

  renderMode('enterprise');
})();
