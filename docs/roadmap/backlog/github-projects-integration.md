# GitHub Projects Integration

**Status**: Backlog (Idea)

## Goal

Evaluate and potentially integrate GitHub Projects for enhanced roadmap visualization and task tracking.

## Context

Current roadmap uses markdown files in `docs/roadmap/` for feature tracking. This works well for documentation and decision history, but GitHub Projects could provide better task management and visibility.

## Potential Benefits

### GitHub Projects Offers
- Visual kanban/board views
- Native issue/PR integration
- Automated workflows (status updates)
- Better team collaboration
- Progress tracking and metrics
- GitHub native (no context switching)
- Mobile app access

### Current Markdown Approach Offers
- Everything in repository
- Works offline
- Git history for changes
- Better for narrative/decisions
- Simple and portable
- No external dependencies
- Easy to read and edit

## Possible Approaches

### Option 1: Hybrid Approach
- Use GitHub Projects for **task tracking** (what/who/when)
- Keep markdown for **feature documentation** (why/how/decisions)
- Projects link to markdown feature docs
- Markdown files remain source of truth for decisions

### Option 2: Full Migration
- Move all tracking to GitHub Projects
- Convert current structure to issues
- Keep only completed documentation in markdown
- Use project automation

### Option 3: Keep Current Approach
- Markdown-first philosophy
- Simple and self-contained
- Works for solo development
- Consider Projects only when team grows

## Questions to Answer

1. Is the overhead of GitHub Projects justified for a solo project?
2. How would we maintain feature documentation alongside Projects?
3. Would automation reduce manual file moves, or add complexity?
4. Do we need better visibility than current markdown provides?
5. How would completed features be documented (Projects vs markdown)?

## Considerations

### When GitHub Projects Makes Sense
- Multiple contributors/team
- Need for visual progress tracking
- Benefit from automation
- Want issue/PR integration
- Need granular task breakdown

### When Markdown Makes Sense
- Solo developer or small team
- Documentation-heavy approach
- Want portability and simplicity
- Git-centric workflow
- Decision history more important than task tracking

## Recommendation

**For Current State**: Markdown approach is working well
- Solo development (currently)
- Simple and effective
- Good for decision documentation
- Low overhead

**Consider GitHub Projects When**:
- Multiple active contributors
- Need better task coordination
- Community wants to help
- Visual tracking becomes valuable

## Next Steps If Pursued

1. Create experimental GitHub Project
2. Test with a few backlog items
3. Evaluate overhead vs benefits
4. Document integration approach
5. Decide on hybrid vs full migration
6. Update workflow documentation

## Related

- Current roadmap structure: `docs/roadmap/`
- Workflow documented in: `docs/roadmap/README.md`
- GitHub Projects docs: https://docs.github.com/en/issues/planning-and-tracking-with-projects
